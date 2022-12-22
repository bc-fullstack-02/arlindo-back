import {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import{ Image } from "phosphor-react";
import Text from "../Text";

interface DropzoneProps {
   onFileIploaded: (file: File) => void 
}

function Dropzone({onFileIploaded}: DropzoneProps) {
    const [selectedFileUrl, setSelectedFileUrl] = useState("");

    const onDrop = useCallback((acceptedFiles: any[]) => {
        const files = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(files);
        
        setSelectedFileUrl(fileUrl);
        onFileIploaded(files);
    }, 
    [onFileIploaded]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div className='flex flex-col' {...getRootProps()}>
            <input id="img" {...getInputProps()} />

         {selectedFileUrl ? (
            <img src={selectedFileUrl} alt="foto" />
         ): (
            <p>
               <Image size={32} weight="thin" />
               <Text>Arraste a imagem ou clique aqui para selecionar!</Text>
            </p>
         )}  
        </div>
      );  
};

export default Dropzone;