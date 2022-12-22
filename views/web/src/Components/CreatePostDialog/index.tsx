import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import api from '../../services/api';
import { FormEvent } from "react";
import Button from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';
import { Post } from '../../models/Post';
import Dropzone from '../Dropzone/inde';

interface CreatePostDialogProps {
    closeDialog: (newPost: Post) => void;
}

interface PostFormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    description: HTMLInputElement;
}

interface PostFormElements extends HTMLFormElement {
    readonly elements: PostFormElements;
}

const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function CreatePostDialog ({ closeDialog }: CreatePostDialogProps) {
    const token = localStorage.getItem("accessToken");
    const [selectedFile, setSelectedFile] = useState<File>();

    async function handleSubmit(event: FormEvent<PostFormElements>) {
       event.preventDefault();
       const form = event.currentTarget;

       const newPost = {
            title: form.elements.title.value,
            description: form.elements.description.value,
            img: await toBase64(form.elements.img.files[0])
       }
       
       try {
            const response = await api.post("/posts", newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        
            closeDialog(response.data);

       } catch (err) {
        console.error(err);
        alert("Erro ao criar o Post");
       }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-2xl font-black">Novo Post</Dialog.Title>
                <form className="mt-8 flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="title" className="font-semibold">
                            Título do Post
                        </label>
                        <TextInput.Input
                            id="title"
                            placeholder="Qual o título do Post?"
                        />
                        <label htmlFor="description" className="font-semibold">
                            O que você está pensando?
                        </label>
                        <TextInput.Input
                            id="description"
                            placeholder="Diga o que está pensando..."
                        />
                        <Dropzone onFileUploded={setSelectedFile} />
                    </div>

                    <footer className='mt-6 flex justify-end gap-4 '>
                        <Dialog.Close
                            type="button"
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                        >
                            Fechar
                        </Dialog.Close>
                        <Button type="submit" className="flex-none w-48">
                            Postar
                        </Button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}

export default CreatePostDialog;