"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lesson } from "@/types/lesson";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, X, Check } from "lucide-react";
import Link from "next/link";
import { subjectService } from "@/services/subjectService";
import { teacherService } from "@/services/teacherService";
import { classService } from "@/services/classService";
import { ExamQuestion } from "@/types/lesson";

interface LessonFormProps {
  initialData?: Lesson;
  onSubmit: (data: Omit<Lesson, "id" | "createdAt" | "updatedAt">) => void;
}

export default function LessonForm({ initialData, onSubmit }: LessonFormProps) {
  const router = useRouter();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [formData, setFormData] = useState<
    Omit<Lesson, "id" | "createdAt" | "updatedAt">
  >(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          subjectId: initialData.subjectId,
          teacherId: initialData.teacherId,
          classId: initialData.classId,
          duration: initialData.duration,
          date: initialData.date,
          startTime: initialData.startTime,
          materials: initialData.materials ? [...initialData.materials] : [],
          objectives: initialData.objectives ? [...initialData.objectives] : [],
          status: initialData.status,
          isExam: initialData.isExam || false,
          totalMarks: initialData.totalMarks || 0,
          passingMarks: initialData.passingMarks || 0,
          questions: initialData.questions ? [...initialData.questions] : [],
        }
      : {
          title: "",
          description: "",
          subjectId: "",
          teacherId: "",
          classId: "",
          duration: 60,
          date: new Date().toISOString().split("T")[0],
          startTime: "09:00",
          materials: [],
          objectives: [],
          status: "scheduled",
          isExam: false,
          totalMarks: 0,
          passingMarks: 0,
          questions: [],
        },
  );

  const [newMaterial, setNewMaterial] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [showExamFields, setShowExamFields] = useState(
    initialData?.isExam || false,
  );
  const [newQuestion, setNewQuestion] = useState<Omit<ExamQuestion, "id">>({
    question: "",
    marks: 1,
    type: "multiple-choice",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsData = await subjectService.getSubjects();
        const teachersData = await teacherService.getAll();
        const classesData = await classService.getClasses();

        setSubjects(subjectsData);
        setTeachers(teachersData);
        setClasses(classesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionTypeChange = (value: string) => {
    const type = value as ExamQuestion["type"];
    setNewQuestion((prev) => ({
      ...prev,
      type,
      options: type === "multiple-choice" ? ["", "", "", ""] : undefined,
      correctAnswer: "",
    }));
  };

  const handleQuestionMarksChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewQuestion((prev) => ({
      ...prev,
      marks: parseInt(e.target.value) || 1,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options?.map((opt, i) => (i === index ? value : opt)),
    }));
  };

  const handleCorrectAnswerChange = (value: string) => {
    setNewQuestion((prev) => ({ ...prev, correctAnswer: value }));
  };

  const handleAddQuestion = () => {
    if (newQuestion.question.trim()) {
      const questionWithId: ExamQuestion = {
        ...newQuestion,
        id: Date.now().toString(),
      };
      setFormData((prev) => ({
        ...prev,
        questions: [...(prev.questions || []), questionWithId],
      }));
      setNewQuestion({
        question: "",
        marks: 1,
        type: "multiple-choice",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions?.filter((q) => q.id !== questionId) || [],
    }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setFormData((prev) => ({
        ...prev,
        materials: [...prev.materials, newMaterial.trim()],
      }));
      setNewMaterial("");
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setFormData((prev) => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()],
      }));
      setNewObjective("");
    }
  };

  const handleRemoveObjective = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-md shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/lessons" passHref>
            <Button type="button" variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-xl font-bold">
            {initialData ? "Edit Lesson" : "Add New Lesson"}
          </h2>
        </div>
        <Button type="submit">{initialData ? "Update" : "Create"}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Lesson Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="subjectId">Subject</Label>
            <Select
              value={formData.subjectId}
              onValueChange={(value) => handleSelectChange("subjectId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="teacherId">Teacher</Label>
            <Select
              value={formData.teacherId}
              onValueChange={(value) => handleSelectChange("teacherId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="classId">Class</Label>
            <Select
              value={formData.classId}
              onValueChange={(value) => handleSelectChange("classId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="15"
              step="15"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                handleSelectChange(
                  "status",
                  value as "scheduled" | "completed" | "cancelled",
                )
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isExam"
              checked={formData.isExam}
              onChange={(e) => {
                const isExam = e.target.checked;
                setFormData((prev) => ({ ...prev, isExam }));
                setShowExamFields(isExam);
              }}
            />
            <Label htmlFor="isExam">This is an exam</Label>
          </div>

          <div>
            <Label>Materials</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                placeholder="Add teaching material"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddMaterial}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {formData.materials.map((material, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-muted p-2 rounded-md"
                >
                  <span className="text-sm">{material}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMaterial(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Learning Objectives</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                placeholder="Add learning objective"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddObjective}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {formData.objectives.map((objective, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-muted p-2 rounded-md"
                >
                  <span className="text-sm">{objective}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveObjective(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {showExamFields && (
            <div className="space-y-4 mt-6 border-t pt-4">
              <h3 className="font-medium text-lg">Exam Settings</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    name="totalMarks"
                    type="number"
                    min="0"
                    value={formData.totalMarks}
                    onChange={handleNumberChange}
                  />
                </div>

                <div>
                  <Label htmlFor="passingMarks">Passing Marks</Label>
                  <Input
                    id="passingMarks"
                    name="passingMarks"
                    type="number"
                    min="0"
                    value={formData.passingMarks}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>

              <div>
                <Label>Questions</Label>
                <div className="space-y-4 mt-2 border p-4 rounded-md">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="question">Question</Label>
                      <Textarea
                        id="question"
                        name="question"
                        value={newQuestion.question}
                        onChange={handleQuestionChange}
                        placeholder="Enter question text"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="questionType">Question Type</Label>
                        <Select
                          value={newQuestion.type}
                          onValueChange={handleQuestionTypeChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">
                              Multiple Choice
                            </SelectItem>
                            <SelectItem value="short-answer">
                              Short Answer
                            </SelectItem>
                            <SelectItem value="essay">Essay</SelectItem>
                            <SelectItem value="true-false">
                              True/False
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="marks">Marks</Label>
                        <Input
                          id="marks"
                          name="marks"
                          type="number"
                          min="1"
                          value={newQuestion.marks}
                          onChange={handleQuestionMarksChange}
                        />
                      </div>
                    </div>

                    {newQuestion.type === "multiple-choice" && (
                      <div className="space-y-2">
                        <Label>Options</Label>
                        {newQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                              }
                              placeholder={`Option ${index + 1}`}
                            />
                            <Button
                              type="button"
                              variant={
                                newQuestion.correctAnswer === option
                                  ? "default"
                                  : "outline"
                              }
                              size="icon"
                              onClick={() => handleCorrectAnswerChange(option)}
                              title="Set as correct answer"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {newQuestion.type === "true-false" && (
                      <div>
                        <Label>Correct Answer</Label>
                        <Select
                          value={newQuestion.correctAnswer}
                          onValueChange={handleCorrectAnswerChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select correct answer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="True">True</SelectItem>
                            <SelectItem value="False">False</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {(newQuestion.type === "short-answer" ||
                      newQuestion.type === "essay") && (
                      <div>
                        <Label htmlFor="correctAnswer">
                          Model Answer (Optional)
                        </Label>
                        <Textarea
                          id="correctAnswer"
                          name="correctAnswer"
                          value={newQuestion.correctAnswer || ""}
                          onChange={handleQuestionChange}
                          placeholder="Enter model answer"
                        />
                      </div>
                    )}

                    <Button
                      type="button"
                      onClick={handleAddQuestion}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Question
                    </Button>
                  </div>
                </div>

                {formData.questions && formData.questions.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">
                      Added Questions ({formData.questions.length})
                    </h4>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {formData.questions.map((q) => (
                        <div
                          key={q.id}
                          className="flex items-center justify-between bg-muted p-3 rounded-md"
                        >
                          <div className="flex-1">
                            <div className="font-medium">{q.question}</div>
                            <div className="text-sm text-muted-foreground">
                              {q.type} • {q.marks} marks
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveQuestion(q.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
