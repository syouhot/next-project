'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { z } from 'zod';
import { formSchema } from '@/lib/validation';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

export default function StartupForm() {
    // 表单不重制问题
    // 必填项问题
    // useractionstate重新查看文档学习
    const [error, setError] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("")
    const router = useRouter()

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch,
            }
            await formSchema.parseAsync(formValues)
            console.log(formValues);

            // const result = await createIdea(prevState,formValues,pitch)

            // if (result.status=="SUCCESS") {
            //     toast.success('success',{
            //       description:"successfully submitted your startup"
            //   }) 
            //   router.push(`/startup/${result._id}`)
            // }
            // return result;
        } catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors = e.flatten().fieldErrors;
                setError(fieldErrors as unknown as Record<string, string>);
                toast.error('Error',{
                    description:"please check your input and try again"
                })
                return { ...prevState, error: "valication error", status: "ERROR" }
            }
            toast.error('Error',{
                description:"an unexpected error occurred"
            })
            return { ...prevState, error: "an unexpected error occurred", status: "ERROR" }
        } finally {

        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" })
    return (
        <form action={formAction} className='startup-form'>

            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>
                <Input type="text" name='title' id='title' className='startup-form_input' required placeholder='startup title' />
                {error.title && <p className='startup-form_error'>{error.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className='startup-form_label'>description</label>
                <Textarea name='description' id='description' className='startup-form_textarea' required placeholder='startup description' />
                {error.description && <p className='startup-form_error'>{error.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className='startup-form_label'>category</label>
                <Input type="text" name='category' id='category' className='startup-form_input' required placeholder='startup category(tech,health,education...)' />
                {error.category && <p className='startup-form_error'>{error.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className='startup-form_label'>image url</label>
                <Input type="text" name='link' id='link' className='startup-form_input' required placeholder='startup image url' />
                {error.link && <p className='startup-form_error'>{error.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className='startup-form_label'>pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id='pitch'
                    preview='edit'
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{ placeholder: "birefly your idea and what proplem it solves" }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }} />
                {error.pitch && <p className='startup-form_error'>{error.pitch}</p>}
            </div>
            <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Startup"}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    )
}
