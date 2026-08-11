import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Briefcase, MapPin, Building2, Plus, Loader2, Search } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { timeAgo } from "@/lib/format";

const jobSchema = z.object({
  title: z.string().trim().min(3, "العنوان قصير جدًا").max(120),
  company: z.string().trim().min(2, "اسم الشركة مطلوب").max(120),
  location: z.string().trim().min(2, "الموقع مطلوب").max(120),
  job_type: z.string().trim().min(2).max(50),
  salary_range: z.string().trim().max(80).optional(),
  description: z.string().trim().min(10, "الوصف قصير جدًا").max(5000),
});

const emptyJob = {
  title: "",
  company: "",
  location: "",
  job_type: "دوام كامل",
  salary_range: "",
  description: "",
};

const Jobs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyJob);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs", search],
    queryFn: async () => {
      let query = supabase.from("jobs").select("*").order("created_at", { ascending: false }).limit(50);
      if (search.trim()) query = query.ilike("title", `%${search.trim()}%`);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: myApplications = [] } = useQuery({
    queryKey: ["my-applications", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("job_applications").select("job_id").eq("applicant_id", user!.id);
      return (data ?? []).map((a) => a.job_id);
    },
  });

  const createJob = useMutation({
    mutationFn: async () => {
      const parsed = jobSchema.safeParse(form);
      if (!parsed.success) throw new Error(parsed.error.issues[0].message);
      const { error } = await supabase.from("jobs").insert({
        title: parsed.data.title,
        company: parsed.data.company,
        location: parsed.data.location,
        job_type: parsed.data.job_type,
        salary_range: parsed.data.salary_range || null,
        description: parsed.data.description,
        posted_by: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setOpen(false);
      setForm(emptyJob);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({ description: "تم نشر الوظيفة بنجاح" });
    },
    onError: (e: Error) => toast({ variant: "destructive", description: e.message }),
  });

  const apply = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase
        .from("job_applications")
        .insert({ job_id: jobId, applicant_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      toast({ description: "تم إرسال طلب التقديم" });
    },
    onError: () => toast({ variant: "destructive", description: "تعذّر التقديم على الوظيفة" }),
  });

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">الوظائف</h1>
          {user && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="ml-2 h-4 w-4" /> نشر وظيفة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>نشر وظيفة جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {[
                    { key: "title", label: "المسمى الوظيفي" },
                    { key: "company", label: "الشركة" },
                    { key: "location", label: "الموقع (مثال: القاهرة)" },
                    { key: "job_type", label: "نوع الدوام" },
                    { key: "salary_range", label: "نطاق الراتب (اختياري)" },
                  ].map(({ key, label }) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key}>{label}</Label>
                      <Input
                        id={key}
                        value={(form as Record<string, string>)[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                  <div className="space-y-2">
                    <Label htmlFor="description">وصف الوظيفة</Label>
                    <Textarea
                      id="description"
                      rows={5}
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    />
                  </div>
                  <Button className="w-full" onClick={() => createJob.mutate()} disabled={createJob.isPending}>
                    {createJob.isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />} نشر
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن وظيفة..."
            className="pr-9"
          />
        </div>

        {isLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin" />}
        {!isLoading && jobs.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <Briefcase className="mx-auto mb-3 h-6 w-6" />
            لا توجد وظائف منشورة حاليًا
          </Card>
        )}

        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" /> {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                    <span>{timeAgo(job.created_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{job.job_type}</Badge>
                  {job.salary_range && <Badge variant="outline">{job.salary_range}</Badge>}
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm">{job.description}</p>
              {user && job.posted_by !== user.id && (
                <Button
                  className="mt-4"
                  size="sm"
                  disabled={myApplications.includes(job.id) || apply.isPending}
                  onClick={() => apply.mutate(job.id)}
                >
                  {myApplications.includes(job.id) ? "تم التقديم" : "تقديم الآن"}
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
