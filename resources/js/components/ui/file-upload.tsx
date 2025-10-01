import { FileUp, X } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload({
    onFileAccepted,
    onFileRejected,
    maxFileSizeMb = 5,
    maxFiles = 3,
    acceptedFileTypes = ['image/*', 'application/pdf'],
    showPreview = false
}) {
    const [previewFiles, setPreviewFiles] = useState([]);

    const onDropAccepted = useCallback((acceptedFiles) => {
        const newImageFiles = acceptedFiles.filter(file =>
            file.type.startsWith('image/')
        ).map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setPreviewFiles(prev => {
            const updated = [...prev, ...newImageFiles].slice(0, maxFiles);
            return updated;
        });

        onFileAccepted?.(acceptedFiles);
    }, [onFileAccepted, maxFiles]);

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
        maxFiles: maxFiles,
        onDropAccepted,
        onDropRejected,
        disabled: previewFiles.length >= maxFiles
    });

    const removeImage = (index) => {
        const updated = [...previewFiles];
        const removed = updated.splice(index, 1);
        // Revoke the object URL to free memory
        URL.revokeObjectURL(removed[0].preview);
        setPreviewFiles(updated);
    };

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            previewFiles.forEach(p => URL.revokeObjectURL(p.preview));
        };
    }, [previewFiles]);

    return (
        <div>
            <div
                {...getRootProps()}
                style={{
                    border: '2px dashed #cccccc',
                    padding: '20px',
                    textAlign: 'center',
                    borderRadius: '8px',
                    opacity: previewFiles.length >= maxFiles ? 0.5 : 1,
                    pointerEvents: previewFiles.length >= maxFiles ? 'none' : 'auto',
                    transition: 'opacity 0.3s',
                }}
                className={`cursor-pointer hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-50 ${previewFiles.length >= maxFiles ? ' border-red-500' : ''}`}
            >
                <input {...getInputProps()} />
                <p>
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
                </p>
            </div>

            {/* Errores de validación */}
            {fileRejections.length > 0 && (
                <div style={{ color: 'red', marginTop: '10px' }}>
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

            {/* Preview de imágenes */}
            {showPreview && previewFiles.length > 0 && (
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {previewFiles.map(({ file, preview }, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'relative',
                                width: '100px',
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
    );
}

export default FileUpload;
