import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Award, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const studentData = {
  name: "Alice Johnson",
  overallGrade: "A",
  avgScore: 87,
  totalExams: 5,
};

const examHistory = [
  { exam: "Midterm", score: 82, maxScore: 100, feedback: "Strong analytical answers. Could improve essay structure.", date: "Feb 12" },
  { exam: "Quiz 3", score: 90, maxScore: 100, feedback: "Excellent grasp of the material. Well-organized responses.", date: "Feb 28" },
  { exam: "Assignment 2", score: 78, maxScore: 100, feedback: "Good effort. Some conceptual gaps in sections B and C.", date: "Mar 5" },
  { exam: "Quiz 4", score: 95, maxScore: 100, feedback: "Outstanding! Near-perfect performance.", date: "Mar 8" },
  { exam: "Final Exam", score: 91, maxScore: 100, feedback: "Comprehensive understanding demonstrated throughout.", date: "Mar 10" },
];

const chartData = examHistory.map((e) => ({ name: e.exam, score: e.score }));

const StudentDashboard = () => {
  const navigate = useNavigate();

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
              <span className="text-xl">👨‍🎓</span>
              <span className="font-display font-bold text-foreground">Student Dashboard</span>
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-body">Welcome, {studentData.name}</span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-5xl">
        {/* Overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Overall Grade", value: studentData.overallGrade, icon: Award, accent: true },
            { label: "Avg Score", value: `${studentData.avgScore}%`, icon: TrendingUp },
            { label: "Exams Taken", value: studentData.totalExams, icon: BookOpen },
            { label: "Feedback", value: `${examHistory.length}`, icon: MessageSquare },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl border border-border shadow-card ${card.accent ? "gradient-hero text-primary-foreground" : "bg-card"}`}
            >
              <card.icon className={`w-5 h-5 mb-3 ${card.accent ? "text-primary-foreground/70" : "text-muted-foreground"}`} />
              <div className={`text-2xl font-display font-bold ${card.accent ? "" : "text-foreground"}`}>{card.value}</div>
              <div className={`text-xs mt-1 ${card.accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-card mb-10"
        >
          <h3 className="font-display font-semibold text-foreground mb-6">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="score" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Exam History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-card"
        >
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Exam History & Feedback</h3>
          </div>
          <div className="divide-y divide-border">
            {examHistory.map((exam) => (
              <div key={exam.exam} className="px-6 py-5 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium text-foreground">{exam.exam}</span>
                    <span className="text-xs text-muted-foreground ml-3">{exam.date}</span>
                  </div>
                  <div className={`text-lg font-display font-bold ${exam.score >= 70 ? "text-success" : exam.score >= 50 ? "text-warning" : "text-danger"}`}>
                    {exam.score}/{exam.maxScore}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{exam.feedback}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboard;
