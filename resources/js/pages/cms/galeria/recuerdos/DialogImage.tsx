import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import FileUpload from '@/components/ui/file-upload';

interface GaleriaRecuerdoFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { id: number; title: string; date: string; descripcion: string; activo: boolean; image: File | null }) => void;
    initialData?: { id: number; title?: string; descripcion?: string, date?: string, activo?: boolean, id?: number };
}

const DialogImage: React.FC<GaleriaRecuerdoFormProps> = ({
    open,
    onClose,
    onSubmit,
    initialData = {},
}) => {
    const isEdit = !!initialData.id;
    const [title, setTitle] = useState(initialData.title || '');
    const [descripcion, setDescripcion] = useState(initialData.descripcion || '');
    const [date, setDate] = useState(initialData.date || '');
    const [image, setImagen] = useState<File | null>(null);
    const [activo, setActivo] = useState(initialData.activo || false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id: initialData.id, title, descripcion, date, activo, image });
    };

    const handleFileAccepted = (archivos) => {
        /** El primero del arreglo [porque maxfiles = 1] */
        setImagen(archivos[0]);
    };

    useEffect(() => {
        if (open) {
            setTitle(initialData.title ?? '');
            setDescripcion(initialData.descripcion ?? '');
            setDate(initialData.date ?? '');
            setImagen(null);
            setActivo(initialData.activo ?? false);
        }
    }, [open, initialData]);

    return (
        <Dialog open={open} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <DialogContent showCloseButton={false} className="bg-white dark:bg-neutral-800">
                    <DialogTitle className="text-gray-900 dark:text-neutral-100">
                        {isEdit ? 'Editar' : 'Agregar'} Recuerdo a Galería
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-neutral-400">
                        Completa el formulario para {isEdit ? 'editar' : 'agregar'} una nueva imagen a la galería de recuerdos.
                    </DialogDescription>

                    <label htmlFor="title" className="font-bold text-gray-700 dark:text-neutral-200">Título</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título"
                        className="bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />

                    <label htmlFor="date" className="font-bold text-gray-700 dark:text-neutral-200">Fecha</label>
                    <Input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Fecha"
                        className="bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />

                    <label htmlFor="descripcion" className="font-bold text-gray-700 dark:text-neutral-200">Descripción</label>
                    <textarea
                        className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        value={descripcion}
                        placeholder='Descripción'
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows={3}
                    />

                    {!isEdit && (
                        <>
                            <label htmlFor="imagen" className="font-bold text-gray-700 dark:text-neutral-200">Imagen</label>
                            <FileUpload
                                maxFiles={1}
                                maxFileSizeMb={5}
                                showPreview={true}
                                hideOnLimit={true}
                                acceptedFileTypes={['image/*']}
                                onFileAccepted={handleFileAccepted}
                                onFileRejected={rejected => {
                                    console.error('Archivos rechazados:', rejected);
                                }}
                            />
                        </>
                    )}

                    <div className="flex flex-col items-center">
                        <label htmlFor="activo" className="font-bold text-gray-700 dark:text-neutral-200">Activo</label>
                        <Switch
                            id="activo"
                            checked={activo}
                            onCheckedChange={setActivo}
                        />
                    </div>

                    <Separator className="mb-3 dark:bg-neutral-700" />
                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="secondary"
                            size="sm"
                            className="my-auto mr-auto cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="success"
                            size="lg"
                            disabled={!title || (!image && !isEdit)}
                            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSubmit}
                        >
                            <Save className="mr-2 h-4 w-4" /> {isEdit ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default DialogImage;