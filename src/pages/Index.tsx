import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "30s", label: "Avg grading time" },
  { value: "98%", label: "Accuracy rate" },
  { value: "10x", label: "Faster than manual" },
];

const features = [
  { icon: Zap, title: "AI-Powered Grading", desc: "Smart evaluation that understands context, not just keywords." },
  { icon: Shield, title: "Plagiarism Detection", desc: "Built-in checks to ensure originality across all submissions." },
  { icon: Clock, title: "Instant Results", desc: "From upload to graded — results in under 30 seconds." },
];

const Index = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">GradeX</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/teacher")}>Teacher Login</Button>
            <Button variant="accent" size="sm" onClick={() => navigate("/student")}>Student Login</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium mb-8 border border-accent/20">
              <Zap className="w-4 h-4 text-accent" />
              AI-Powered Exam Grading
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              Grade exams in{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
                seconds
              </span>
              , not hours.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body">
              Upload answers, let AI evaluate them instantly, and deliver plagiarism-free, accurate results to students in real time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="hero" size="xl" onClick={() => navigate("/teacher")}>
              I'm a Teacher <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/student")}>
              I'm a Student <BookOpen className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center gap-12 md:gap-20"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Three steps. Zero hassle.
            </h2>
            <p className="text-muted-foreground text-lg">Upload → AI Grades → Instant Results</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload Answers", desc: "Batch upload student answer sheets in any format." },
              { step: "02", title: "AI Evaluates", desc: "Our AI grades each answer with contextual understanding." },
              { step: "03", title: "Results Ready", desc: "Students get instant grades, feedback, and insights." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-8 rounded-2xl bg-background shadow-card hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="text-5xl font-display font-bold text-accent/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl border border-border hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Get started now</h2>
          <p className="text-muted-foreground text-lg mb-10">Choose your role to access your dashboard.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { role: "teacher", icon: "👩‍🏫", title: "Teacher", desc: "Upload, grade, and manage exam results.", path: "/teacher" },
              { role: "student", icon: "👨‍🎓", title: "Student", desc: "View grades, feedback, and performance.", path: "/student" },
            ].map((r) => (
              <motion.div
                key={r.role}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredRole(r.role)}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => navigate(r.path)}
                className="cursor-pointer p-8 rounded-2xl bg-background shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-accent/40"
              >
                <div className="text-4xl mb-4">{r.icon}</div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-hero" />
            <span className="font-display font-semibold text-foreground text-sm">GradeX</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 GradeX. AI-powered exam grading.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
