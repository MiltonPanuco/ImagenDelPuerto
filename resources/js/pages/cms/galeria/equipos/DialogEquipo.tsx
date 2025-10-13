import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import * as Icons from 'lucide-react';

interface Equipo {
    id: number;
    servicio: string;
    titulo: string;
    descripcion: string;
    caracteristicas: string[];
    image?: string;
    icon?: keyof typeof Icons;
}

interface DialogEquipoProps {
    open: boolean;
    onClose: () => void;
    equipo?: Equipo;
}

const DialogEquipo = ({ open, onClose, equipo }: DialogEquipoProps) => {
    if (!open) return null;
    const IconComponent = equipo.icon ? Icons[equipo.icon] : Icons.Box;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent showCloseButton={false}>
                <DialogTitle className="flex items-center justify-between text-gray-900 dark:text-neutral-100">
                    Detalles de Equipo
                    <button
                        onClick={onClose}
                        className="ml-auto text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200 text-2xl font-bold cursor-pointer transition-colors"
                        aria-label="Cerrar"
                        type="button"
                    >
                        &times;
                    </button>
                </DialogTitle>
                <DialogDescription></DialogDescription>

                <Card
                    key={equipo.id}
                    className="group shadow-lg bg-white dark:bg-neutral-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-3xl overflow-hidden border border-slate-200 dark:border-neutral-700"
                >
                    <div className="relative overflow-hidden">
                        <img
                            src={equipo?.image || "/storage/default_card.svg"}
                            alt={equipo?.servicio}
                            className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent dark:from-black/40"></div>
                    </div>
                    <CardContent className="p-6 sm:p-8 text-center">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-${equipo.color}-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-105 transition-all duration-300 shadow-lg`}>
                            {IconComponent ? <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" /> : null}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-neutral-100 mb-3 sm:mb-4">
                            {equipo.titulo}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed text-pretty mb-4 sm:mb-6 text-left">
                            {equipo.descripcion}
                        </p>
                        <div className="space-y-2 text-left">
                            {equipo.caracteristicas && equipo.caracteristicas.map((c, index) => (
                                <div key={index} className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 flex items-center">
                                    <div className={`w-2 h-2 bg-${equipo.color}-600 rounded-full mr-3 flex-shrink-0`} />
                                    {c}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default DialogEquipo;