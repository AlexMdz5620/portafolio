import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { Description } from '../../schemas/descriptionSchema';
import { WithId } from '../dialog/CrudDialog';

type DescrCardProps = {
  desc: Description;
  openView: (itemData: Record<string, unknown> & Partial<WithId>) => void;
  openEdit: (itemData: Record<string, unknown> & Partial<WithId>) => void;
  openDelete: (itemData: Record<string, unknown> & Partial<WithId>) => void;
}

export default function DescrCard({
  desc,
  openView,
  openEdit,
  openDelete,
}: DescrCardProps) {
  return (
    <Card
      key={desc.id}
      className="w-full hover:shadow-lg transition-shadow duration-200 flex flex-col bg-[#121212] border border-white/10 rounded-xl text-white">
      {/* HEADER */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold wrap-break-word max-w-[70%]">
          <div className="space-y-1 flex items-center gap-2">
            {desc.name}
          </div>
        </CardTitle>
      </CardHeader>
      {/* Content */}
      <CardContent className="flex-1 pt-0">
        {desc.content
          ? <p className='text-sm wrap-break-word leading-relaxed opacity-90'>
            {(() => {
              const maxWords = 20;
              const maxChars = 80;
              let cont = desc.content;
              // Limita palabras
              const words = cont.split(" ");
              if (words.length > maxWords) {
                cont = words.slice(0, maxWords).join(" ");
              }
              // Limita caracteres
              if (cont.length > maxChars) {
                cont = cont.slice(0, maxChars) + "...";
              }
              return cont.endsWith(".") ? cont : cont + ".";
            })()}
          </p>
          : <p className='text-sm leading-relaxed opacity-90 wrap-break-word'>Sin descripción</p>
        }
      </CardContent>
      {/* Footer */}
      <CardFooter className="flex justify-end gap-3 border-t border-white/10 pt-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openView(desc)}
          className="hover:scale-105 transition-transform"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openEdit(desc)}
          className="hover:scale-105 transition-transform"
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => openDelete(desc)}
          className="hover:scale-105 transition-transform text-red-600 hover:text-white hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
