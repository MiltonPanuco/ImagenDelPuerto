import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, X } from 'lucide-react';

const FileUpload = ({
    onFileAccepted,
    onFileRejected,
    maxFileSizeMb = 5,
    maxFiles = 3,
    acceptedFileTypes = ['image/*', 'application/pdf'],
    showPreview = false,
    twoColumns = false,
    hideOnLimit = false,
}) => {
  const [previewFiles, setPreviewFiles] = useState([]);

  const onDropAccepted = useCallback((acceptedFiles) => {
    const newImageFiles = acceptedFiles.filter(file => file.type.startsWith('image/')).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    // Revocar previews anteriores
    previewFiles.forEach(p => URL.revokeObjectURL(p.preview));

    setPreviewFiles(newImageFiles);
    onFileAccepted?.(acceptedFiles);
  }, [onFileAccepted, previewFiles]);

  const onDropRejected = useCallback((rejectedFiles) => {
    onFileRejected?.(rejectedFiles);
  }, [onFileRejected]);

  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
  } = useDropzone({
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {}),
    maxSize: maxFileSizeMb * 1024 * 1024,
    maxFiles,
    onDropAccepted,
    onDropRejected,
    disabled: previewFiles.length >= maxFiles,
  });

    const removeImage = (index) => {
        const removed = previewFiles[index];
        if (removed) URL.revokeObjectURL(removed.preview);

        const updated = [...previewFiles];
        updated.splice(index, 1);
        setPreviewFiles(updated);
    };

    useEffect(() => {
        return () => {
            previewFiles.forEach(p => URL.revokeObjectURL(p.preview));
        };
    }, [previewFiles]);

    return (
        <div style={{ display: twoColumns ? 'flex' : 'block', gap: '20px' }}>
            {(!hideOnLimit || (previewFiles.length < maxFiles)) && (
                <div
                {...getRootProps()}
                style={{
                    border: '2px dashed #cccccc',
                    padding: '20px',
                    textAlign: 'center',
                    borderRadius: '8px',
                    opacity: previewFiles.length >= maxFiles ? 0.5 : 1,
                    cursor: previewFiles.length >= maxFiles ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.3s',
                    flex: twoColumns ? '1' : 'unset',
                }}
                className={`cursor-pointer hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-50 ${previewFiles.length >= maxFiles ? ' border-red-500' : ''}`}
                >
                <input {...getInputProps()} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <FileUp className={`mx-auto mb-2 size-6 text-muted-foreground ${previewFiles.length >= maxFiles ? 'text-red-500' : ''}`} />
                    {previewFiles.length >= maxFiles ? (
                    <span className='text-red-500'>Límite de archivos alcanzado</span>
                    ) : isDragActive ? (
                    <span>Suelta los archivos aquí...</span>
                    ) : (
                    <span>Haz clic o arrastra archivos aquí</span>
                    )}
                    <br />
                    <span className={`${previewFiles.length >= maxFiles ? 'text-red-500' : ''}`}>{maxFiles} permitido{maxFiles === 1 ? '' : 's'}</span>
                </div>
            </div>
            )}

            {/* Vista previa + errores */}
            <div style={{ flex: twoColumns ? '1' : 'unset' }}>
                {fileRejections.length > 0 && (
                    <div style={{ color: 'red', marginTop: twoColumns ? '0' : '10px' }}>
                        <ul>
                        {fileRejections.map(({ file, errors }) => (
                            <li key={file.path}>
                            <b className="text-black-500">Archivo no válido:</b> {file.name}
                                <ul>
                                    {errors.map(e => (
                                    <li key={e.code}>{e.message}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                        </ul>
                    </div>
                )}

                {showPreview && previewFiles.length > 0 && (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }} className="justify-center">
                        {previewFiles.map(({ file, preview }, index) => (
                            <div
                                key={index}
                                    style={{
                                    position: 'relative',
                                    width: '50%',
                                    textAlign: 'center',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '5px',
                                    background: '#fafafa'
                                    }}
                                >
                                <img
                                    src={preview}
                                    alt={file.name}
                                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    style={{
                                        position: 'absolute',
                                        top: '2px',
                                        right: '2px',
                                        background: 'rgba(0,0,0,0.6)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    }}
                                    title="Eliminar"
                                >
                                    <X size={14} />
                                </button>
                                <small>{file.name}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
