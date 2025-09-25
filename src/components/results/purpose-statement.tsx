
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Save, Info, Loader2, Upload, X } from 'lucide-react';
import { useQuestionnaire } from '@/lib/context/questionnaire-context';
import { saveLifePlan } from '@/firebase/firestore-actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function PurposeStatement() {
  const { user, answers, lifePlan, setLifePlan } = useQuestionnaire();
  const [statement, setStatement] = useState(lifePlan.purposeStatement || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(lifePlan.purposeImage || null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(!!lifePlan.id);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Sync local state with context when it changes (e.g., on login)
    setStatement(lifePlan.purposeStatement || '');
    setImagePreview(lifePlan.purposeImage || null);
    setIsSaved(!!lifePlan.id);
  }, [lifePlan]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsSaved(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setIsSaved(false);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSave = async () => {
    if (!user || !answers) return;
    setIsSaving(true);
    try {
      let purposeImage: string | undefined = imagePreview || undefined;
      if (imageFile) {
        purposeImage = await fileToBase64(imageFile);
      }
      
      const dataToSave: any = {
        id: lifePlan.id,
        user,
        answers,
        purposeStatement: statement,
        purposeImage: purposeImage,
      };

      const savedData = await saveLifePlan(dataToSave);

      // Update context with the latest saved data
      setLifePlan({
        id: savedData.id,
        purposeStatement: savedData.purposeStatement,
        purposeImage: savedData.purposeImage || null,
      });
      
      setIsSaved(true);
      toast({
        title: '¡Propósito Guardado!',
        description: 'Tu plan de vida ha sido guardado en esta aplicación.',
      });
      setIsAlertOpen(true); // Open the alert dialog on successful save
    } catch (error) {
      console.error("Error saving life plan:", error);
      toast({
        variant: 'destructive',
        title: 'Error al guardar',
        description: 'Hubo un problema al guardar tu plan de vida. Por favor, intenta de nuevo.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Card className="shadow-lg h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Crea tu Declaración de Propósito</CardTitle>
          </div>
          <CardDescription>
            Sintetiza tus reflexiones en una única y poderosa declaración que te servirá de guía.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <Textarea
            placeholder="Ej: 'Mi propósito es utilizar la tecnología para crear soluciones educativas accesibles, participando activamente en proyectos de impacto social...'"
            className="min-h-[150px] text-lg leading-relaxed bg-card focus:bg-background"
            value={statement}
            onChange={(e) => {
              setStatement(e.target.value);
              setIsSaved(false);
            }}
          />
          <div className="space-y-2">
            <Label>Una imagen que represente tu propósito (opcional)</Label>
            {imagePreview ? (
              <div className="relative group">
                <Image
                  src={imagePreview}
                  alt="Vista previa del propósito"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-full h-48"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <Label
                  htmlFor="purpose-image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary/50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG o GIF</p>
                  </div>
                  <Input id="purpose-image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/gif" onChange={handleImageChange} />
                </Label>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <div className="flex items-center p-3 text-sm rounded-lg bg-secondary/50 text-secondary-foreground w-full">
              <Info className="h-5 w-5 mr-3 text-primary shrink-0" />
              <div>
                <p>
                  Guarda tu Propósito en: <br />
                  <span className="font-semibold">MiVidaTec &gt; Mi plan de vida &gt; Propósito de Vida</span>.
                </p>
                <Link
                  href="https://scribehow.com/viewer/Actualiza_tu_Proposito_de_Vida_En_MiVidaTec__1urbJ9PYRW29avB31VC9Hg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Ver guía paso a paso
                </Link>
              </div>
          </div>
           <div className="flex justify-end w-full">
              <Button onClick={handleSave} disabled={!statement || isSaving || isSaved} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {isSaved ? 'Propósito Guardado' : 'Guardar Propósito de Vida'}
              </Button>
           </div>
        </CardFooter>
      </Card>
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-accent">¡Un último paso importante!</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Has guardado tu propósito en esta herramienta. ¡Felicidades!
              <br/><br/>
              Ahora, asegúrate de registrarlo también en la plataforma oficial <span className="font-bold text-foreground">MiVidaTec</span> para que tu mentor(a) pueda verlo y darle seguimiento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsAlertOpen(false)} className="bg-accent text-accent-foreground hover:bg-accent/90">
              ¡Entendido!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
