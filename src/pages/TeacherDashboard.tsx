import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertTriangle, ArrowLeft, Loader2, Eye, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface GradedStudent {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  plagiarism: number;
  feedback: string;
  status: "graded" | "flagged";
}

const mockResults: GradedStudent[] = [
  { id: "1", name: "Alice Johnson", score: 87, maxScore: 100, plagiarism: 2, feedback: "Excellent understanding of core concepts. Minor gaps in application section.", status: "graded" },
  { id: "2", name: "Bob Smith", score: 72, maxScore: 100, plagiarism: 5, feedback: "Good effort overall. Needs improvement in analytical questions.", status: "graded" },
  { id: "3", name: "Carol Davis", score: 95, maxScore: 100, plagiarism: 1, feedback: "Outstanding work. Clear, well-structured answers throughout.", status: "graded" },
  { id: "4", name: "David Wilson", score: 45, maxScore: 100, plagiarism: 38, feedback: "Significant similarity detected with another submission. Review required.", status: "flagged" },
  { id: "5", name: "Eva Martinez", score: 68, maxScore: 100, plagiarism: 3, feedback: "Solid foundational knowledge. Could elaborate more on essay questions.", status: "graded" },
  { id: "6", name: "Frank Lee", score: 91, maxScore: 100, plagiarism: 0, feedback: "Exceptional performance. Demonstrates deep understanding.", status: "graded" },
];

type View = "upload" | "grading" | "results";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("upload");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = () => {
    setView("grading");
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setView("results"), 500);
      }
      setProgress(p);
    }, 300);
  };

  const avgScore = Math.round(mockResults.reduce((a, b) => a + b.score, 0) / mockResults.length);
  const flagged = mockResults.filter((r) => r.status === "flagged").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xl">👩‍🏫</span>
              <span className="font-display font-bold text-foreground">Teacher Dashboard</span>
            </div>
          </div>
          <Button variant="accent" size="sm" onClick={() => setView("upload")}>
            <Upload className="w-4 h-4" /> New Upload
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-5xl">
        <AnimatePresence mode="wait">
          {view === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">Upload Answer Sheets</h1>
                <p className="text-muted-foreground">Drag & drop or click to upload student submissions for AI grading.</p>
              </div>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(); }}
                onClick={handleUpload}
                className={`cursor-pointer border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
                  dragOver ? "border-accent bg-accent/5 shadow-elevated" : "border-border hover:border-accent/40 hover:shadow-card"
                }`}
              >
                <div className="w-16 h-16 rounded-2xl gradient-accent mx-auto flex items-center justify-center mb-6">
                  <Upload className="w-8 h-8 text-accent-foreground" />
                </div>
                <p className="text-lg font-display font-semibold text-foreground mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-muted-foreground">Supports PDF, DOCX, JPG, PNG — up to 50 files at once</p>
              </div>
            </motion.div>
          )}

          {view === "grading" && (
            <motion.div key="grading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-20">
              <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">AI is grading...</h2>
              <p className="text-muted-foreground mb-8">Evaluating answers and checking for plagiarism</p>
              <div className="max-w-md mx-auto">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-3">{Math.round(progress)}% complete</p>
              </div>
            </motion.div>
          )}

          {view === "results" && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Summary cards */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { label: "Students Graded", value: mockResults.length, icon: FileText, color: "text-foreground" },
                  { label: "Average Score", value: `${avgScore}%`, icon: BarChart3, color: "text-success" },
                  { label: "Flagged", value: flagged, icon: AlertTriangle, color: "text-danger" },
                ].map((card) => (
                  <div key={card.label} className="p-6 rounded-2xl bg-card shadow-card border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <card.icon className={`w-5 h-5 ${card.color}`} />
                      <span className="text-sm text-muted-foreground">{card.label}</span>
                    </div>
                    <div className={`text-3xl font-display font-bold ${card.color}`}>{card.value}</div>
                  </div>
                ))}
              </div>

              {/* Results table */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="font-display font-semibold text-foreground">Grading Results</h3>
                </div>
                <div className="divide-y divide-border">
                  {mockResults.map((student) => (
                    <div key={student.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{student.name}</span>
                          {student.status === "flagged" && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-danger/10 text-danger text-xs font-medium">
                              <AlertTriangle className="w-3 h-3" /> Plagiarism
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-0.5">{student.feedback}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-display font-bold ${student.score >= 70 ? "text-success" : student.score >= 50 ? "text-warning" : "text-danger"}`}>
                          {student.score}/{student.maxScore}
                        </div>
                        <div className="text-xs text-muted-foreground">{student.plagiarism}% similarity</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TeacherDashboard;
