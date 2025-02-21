
import React from "react";
import Hero from "@/components/Hero";
import PhotoGrid from "@/components/PhotoGrid";
import { PlatformStats } from "@/components/PlatformStats";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Logo />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-qudpro-primary to-qudpro-secondary bg-clip-text text-transparent">
            Welcome to QudPro
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with professionals across Egypt
          </p>
        </div>
        <PlatformStats />
        <div className="mt-12">
          <PhotoGrid />
        </div>
      </div>
    </div>
  );
};

export default Index;
