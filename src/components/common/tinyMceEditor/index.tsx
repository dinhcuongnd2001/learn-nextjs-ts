import React, { FC } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import "./index.css"

interface TinyMCEEditorProps {
  value?: string;
  onEditorChange: (content: string) => void;
}

const TinyMCEEditor: FC<TinyMCEEditorProps> = ({ value = '', onEditorChange }) => {
  return (
    <Editor
      value={value}
      apiKey={process.env.NEXT_PUBLIC_TINY_KEY}
      init={{
        height: 500,
        menubar: false,
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | \
          forecolor backcolor | link image media table code | inserttable tableprops tabledelete | tablecellprops tablerowprops tablecellprops',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}',
      }}
      onEditorChange={onEditorChange}
    />
  );
};

export default TinyMCEEditor;
