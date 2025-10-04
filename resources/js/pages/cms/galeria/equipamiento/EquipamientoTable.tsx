import { Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';

import { default as Swal, SwalError2, SwalToast } from '@/lib/swal';
import { apiDelete, apiPatch } from '@/lib/axios';

interface Item {
  id: number;
  categoria: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  activo: boolean;
}

interface PaginatedData<T> {
  data: T[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

interface DataTableProps {
  items: PaginatedData<Item>;
  resourceRoute: string; // ej: 'cms.servicios'
}

export default function DataTable({ items, resourceRoute }: DataTableProps) {
  // Estado local para los items, para poder actualizar el activo
  const [localItems, setLocalItems] = useState<Item[]>(items.data);

  useEffect(() => {
    setLocalItems(items.data);
  }, [items.data]);

  const handleSwitch = async (item: Item) => {
    try {
      const url = route(`${resourceRoute}.activo`, item.id);
      const response = await apiPatch(url);
      // Actualizo el estado local con el nuevo valor de activo
      setLocalItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id ? { ...i, activo: response.data.activo } : i
        )
      );
      SwalToast({
        title: 'Registro actualizado',
        text: response.data.activo ? 'Activo' : 'Inactivo',
        icon: 'success',
      });
    } catch (error) {
        SwalError2(error)
    }
  };

  const onDelete = async (item: Item) => {
        const r = await Swal.fire({
            title: '¿Estás seguro?',
            html: `Estás a punto de <b class="text-red-500 uppercase">eliminar</b> el siguiente registro de sección: <div class="my-4 font-bold">ID: ${item.id} (${item.titulo} - ${item.subtitulo}).</div>Esta acción es irreversible.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // rojo
            cancelButtonColor: '#6b7280', // gris
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        });
        if (r.isConfirmed) {
            try {
                const url = route(`${resourceRoute}.destroy`, item.id);
                await apiDelete(url);
                // Actualizo el estado local removiendo el item eliminado
                setLocalItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
                SwalToast('¡Registro eliminado correctamente!');
                if (localItems.length === 1 && items.links.length > 0) {
                    const currentPageIndex = items.links.findIndex(link => link.active);
                    if (currentPageIndex > 0 && items.links[currentPageIndex - 1].url) {
                        router.visit(items.links[currentPageIndex - 1].url);
                    }
                }
            } catch (error) {
                SwalError2(error);
            }
        }
  }


  return (
    <div>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto text-left text-sm">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Categoría</th>
              <th className="px-6 py-3">Titulo</th>
              <th className="px-6 py-3">Subtitulo</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Equipos</th>
              <th className="px-6 py-3">Activo</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {localItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-slate-400">
                  Sin equipamiento registrado
                </td>
              </tr>
            ) : (
              localItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.categoria}</td>
                  <td className="px-6 py-4">{item.titulo}</td>
                  <td className="px-6 py-4">{item.subtitulo}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{item.descripcion}</td>
                  <td className='px-6 py-4'>{item.equipos_count}</td>
                  <td className="px-6 py-4">
                    <Switch
                        checked={item.activo}
                        onCheckedChange={() => handleSwitch(item)}
                        />
                    </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link href={route(`${resourceRoute}.edit`, item.id)} className="text-orange-600 hover:underline">
                      <Edit className="inline w-4 h-4 mr-1 cursor-pointer" />
                    </Link>
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:underline"
                    >
                      <Trash2 className="inline w-4 h-4 mr-1 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="p-4 flex flex-wrap gap-2 justify-center border-t bg-slate-50">
          {items.links.map((link, index) => (
            <button
              key={index}
              disabled={!link.url}
              onClick={() => link.url && router.visit(link.url)}
              className={`px-3 py-1 text-sm rounded ${
                link.active ? 'bg-blue-600 text-white' : 'bg-white border text-slate-700 hover:bg-slate-100'
              }`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
