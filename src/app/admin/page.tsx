"use client";

import { useState, useEffect } from 'react';
import { getLifePlans } from '@/firebase/firestore-actions';
import type { LifePlanData } from '@/firebase/firestore-actions';
import { Header } from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import { MENTORS_BY_COMMUNITY } from '@/lib/mentors-data';

const getCommunityFromMentor = (mentorNickname: string) => {
    for (const community of MENTORS_BY_COMMUNITY) {
        if (community.mentors.some(m => m.nickname === mentorNickname)) {
            return community.name;
        }
    }
    return 'Desconocida';
};

export default function AdminDashboardPage() {
  const [lifePlans, setLifePlans] = useState<LifePlanData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const plans = await getLifePlans();
      setLifePlans(plans);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const downloadCSV = () => {
    const headers = [
      'Nombre',
      'Matrícula',
      'Mentor',
      'Comunidad',
      'Declaración de Propósito',
      'URL de Imagen',
      'Fecha de Creación',
    ];

    const rows = lifePlans.map(plan => [
      `"${plan.user.name.replace(/"/g, '""')}"`,
      `"${plan.user.studentId}"`,
      `"${plan.user.mentor}"`,
      `"${getCommunityFromMentor(plan.user.mentor)}"`,
      `"${plan.purposeStatement.replace(/"/g, '""')}"`,
      `"${plan.purposeImage || ''}"`,
      `"${plan.createdAt ? new Date(plan.createdAt).toLocaleString() : ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'reporte_propositos_de_vida.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <>
      <Header />
      <main className="container py-8 md:py-12">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <CardTitle className="text-3xl">Dashboard de Administrador</CardTitle>
                    <CardDescription>
                    Visualiza y gestiona todos los propósitos de vida guardados por los estudiantes.
                    </CardDescription>
                </div>
                <Button onClick={downloadCSV} disabled={lifePlans.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Reporte (CSV)
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : lifePlans.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                    <p>Aún no hay planes de vida guardados.</p>
                </div>
            ) : (
              <div className="overflow-x-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Comunidad</TableHead>
                      <TableHead>Declaración de Propósito</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lifePlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.user.name}</TableCell>
                        <TableCell>{plan.user.studentId}</TableCell>
                        <TableCell>{plan.user.mentor}</TableCell>
                        <TableCell>{getCommunityFromMentor(plan.user.mentor)}</TableCell>
                        <TableCell className="max-w-xs truncate">{plan.purposeStatement}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
