import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && (
                <label className='block mb-1.5 pl-1 text-sm font-semibold text-gray-400 uppercase tracking-widest'>
                    {label}
                </label>
            )}

            {/* Editor wrapper with dark border */}
            <div className="rounded-xl overflow-hidden border border-gray-700 focus-within:border-amber-500 transition-colors duration-200">
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor
                            apiKey='lt51al0wm07gbutajof4qjqrvj1iqgab1g2floc08s7mcq48'
                            initialValue={defaultValue}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image',
                                    'charmap', 'preview', 'anchor', 'searchreplace',
                                    'visualblocks', 'code', 'fullscreen', 'insertdatetime',
                                    'media', 'table', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | bold italic backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | removeformat | help',
                                content_style: 'body { font-family: Georgia, serif; font-size: 15px; line-height: 1.7; color: #1f2937; }',
                                skin: 'oxide',
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default RTE
