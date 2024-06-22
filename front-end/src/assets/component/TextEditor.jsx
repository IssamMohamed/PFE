import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Style from './Styles/TextEditor.module.css';

function TextEditor({ id_E, id,id_from, onClose, role }) {
  const [report, setReport] = useState('');
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState('red');
  const [btne, setBtne] = useState(role !== 'employee');
  const [btnd, setBtnd] = useState(role !== 'director');
 
  useEffect(() => {
    console.log(id_E,id_from)
    
    const fetchData = async () => {
      if (!id) return;

      try {
        const response = await fetch('http://localhost/back_endgenerale/OpenReport.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        });

        if (response.ok) {
          const data = await response.json();
          setReport(data[0].content);
          setStatus(data[0].status);
          setColor(data[0].status === 'Accepted' ? 'green' : 'red');
          if(data[0].id_from===id_E){
            setBtne(false)
          }else if(data[0].id_to===id_E){
            setBtnd(false)
          }
        } else {
          alert('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('content', content || report);

    try {
      const response = await fetch('http://localhost/back_endgenerale/SaveReport.php', {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      const data = JSON.parse(text);
    } catch (error) {
      console.error('Error:', error);
    }
    setSaved(true);
  };

  const valider = async () => {
    try {
      const response = await fetch('http://localhost/back_endgenerale/Validationreport.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_E: id_E, id: id }),
      });

      const text = await response.text();
      const data = JSON.parse(text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const Accepter = async () => {
    try {
      const response = await fetch('http://localhost/back_endgenerale/Accepter.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      const text = await response.text();
      const data = JSON.parse(text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleQuit = () => {
    if (saved) {
      onClose();
      setSaved(false);
    } else {
      const userConfirmation = window.confirm("Do you want to save your changes?");
      if (userConfirmation) {
        setSaved(true);
      }
    }
  };

  return (
    <>
      <div className={Style.containerT}>
        <form onSubmit={handleSubmit}>
          <Editor
            apiKey='97hg5xgpgxlrc11uh5fgrq55xkwjckkix79am2vf7s7tjhum'
            init={{
              selector: 'textarea',
              height: 569,
              width: 1280,
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            initialValue={report}
            onEditorChange={(content) => setContent(content)}
          />

          <div className={Style.buttonsT}>
            <h1
              style={{
                fontSize: '20px',
                color: color,
                textAlign: 'center',
                marginTop: '10px',
                marginRight: '50px',
                marginBottom: '15px',
                marginLeft: '5px',
              }}
            >
              {status}
            </h1>
            {btne ? <button className={Style.buttonT} type='button' onClick={Accepter}>Validate</button> : null}
            <button className={Style.buttonT} type='submit'>Save</button>
            {btnd ? <button className={Style.buttonT} type='button' onClick={valider}>Send</button> : null}
            <button className={Style.buttonT} type='button' onClick={handleQuit}>Quit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TextEditor;
