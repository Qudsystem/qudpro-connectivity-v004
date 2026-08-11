import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "ما هي منصة QudPro؟", a: "منصة مهنية مصرية تربط المحترفين والشركات، وتتيح النشر والتواصل والتقديم على الوظائف." },
  { q: "كيف أنشئ حسابًا؟", a: "اضغط على «تسجيل الدخول» ثم أنشئ حسابًا بالبريد الإلكتروني أو عبر حساب Google." },
  { q: "كيف أضيف صورة لمنشوري؟", a: "من صندوق إنشاء المنشور اضغط أيقونة الكاميرا واختر صورة بحجم أقل من 5 ميجابايت." },
  { q: "كيف أنشر وظيفة؟", a: "من صفحة الوظائف اضغط «نشر وظيفة» واملأ البيانات المطلوبة." },
  { q: "كيف أتواصل مع محترف آخر؟", a: "من صفحته الشخصية اضغط «اتصال» لإرسال طلب، أو «رسالة» لبدء محادثة." },
];

const Help = () => (
  <Layout>
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold">مركز المساعدة</h1>
      <p className="mb-6 text-muted-foreground">إجابات لأكثر الأسئلة شيوعًا حول استخدام QudPro.</p>
      <Card className="p-4">
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-right">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        لم تجد إجابتك؟ راسلنا على support@qudpro.com
      </p>
    </div>
  </Layout>
);

export default Help;
