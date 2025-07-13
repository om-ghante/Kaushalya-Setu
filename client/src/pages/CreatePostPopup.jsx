// src/pages/CreatePostPopup.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BsPersonCircle, BsHeart, BsTrash, BsChat, BsShare, BsGripVertical } from 'react-icons/bs';
import MediaInput from '../components/inputs/MediaInput';
import TextArea from '../components/inputs/TextArea';
import TextButton from '../components/buttons/TextButton';

const CreatePostSPopup = () => {
  const [step, setStep] = useState(1);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]); 
  const [caption, setCaption] = useState('');
  const [user, setUser] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const pdfjsRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.async = true;
    script.onload = () => {
      pdfjsRef.current = window.pdfjsLib;
      pdfjsRef.current.GlobalWorkerOptions.workerSrc = 
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    };
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const convertPdfToImage = (file) => {
    return new Promise((resolve) => {
      if (!pdfjsRef.current) {
        console.error('PDF.js not loaded yet');
        resolve(null);
        return;
      }

      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        
        try {
          const pdf = await pdfjsRef.current.getDocument(typedArray).promise;
          const page = await pdf.getPage(1);
          
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise;
          
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        } catch (error) {
          console.error('PDF rendering failed, using fallback:', error);
          resolve(null);
        }
      };
      
      reader.readAsArrayBuffer(file);
    });
  };

  useEffect(() => {
    const processFiles = async () => {
      const newPreviews = [];
      
      for (const file of mediaFiles) {
        if (newPreviews.some(p => p.file === file)) continue;
        
        if (file.type === 'application/pdf') {
          const pdfImage = await convertPdfToImage(file);
          if (pdfImage) {
            newPreviews.push({
              type: 'image',
              url: pdfImage,
              name: file.name,
              file
            });
          } else {
            newPreviews.push({
              type: 'pdf',
              url: URL.createObjectURL(file),
              name: file.name,
              file
            });
          }
        } else if (file.type.startsWith('image/')) {
          newPreviews.push({
            type: 'image',
            url: URL.createObjectURL(file),
            name: file.name,
            file
          });
        } else if (file.type.startsWith('video/')) {
          newPreviews.push({
            type: 'video',
            url: URL.createObjectURL(file),
            name: file.name,
            file
          });
        }
      }
      
      setMediaPreviews(newPreviews);
    };

    if (mediaFiles.length > 0) {
      processFiles();
    }

    return () => {
      mediaPreviews.forEach(preview => {
        if (preview.url && preview.url.startsWith('blob:')) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [mediaFiles]);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || step !== 1) return;
    
    const newFiles = [...mediaFiles];
    const newPreviews = [...mediaPreviews];

    const movedFile = newFiles.splice(draggedIndex, 1)[0];
    const movedPreview = newPreviews.splice(draggedIndex, 1)[0];
    
    newFiles.splice(index, 0, movedFile);
    newPreviews.splice(index, 0, movedPreview);
    
    setMediaFiles(newFiles);
    setMediaPreviews(newPreviews);
    setDraggedIndex(null);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    mediaFiles.forEach(file => formData.append('media', file));
    formData.append('caption', caption);
    formData.append('userId', user?.id || '');

    console.log('Uploading post with:', {
      files: mediaFiles,
      caption,
      user
    });
    
    alert('Post created successfully!');

    setMediaFiles([]);
    setMediaPreviews([]);
    setCaption('');
    setStep(1);
  };

  const handleRemoveMedia = (index) => {
    const newFiles = [...mediaFiles];
    const newPreviews = [...mediaPreviews];

    if (mediaPreviews[index].url.startsWith('blob:')) {
      URL.revokeObjectURL(mediaPreviews[index].url);
    }
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setMediaFiles(newFiles);
    setMediaPreviews(newPreviews);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      {step === 1 && (
        <>
          <MediaInput 
            files={mediaFiles} 
            setFiles={setMediaFiles} 
          />

          {mediaPreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-0.5 mt-4">
              {mediaPreviews.map((preview, index) => (
                <div 
                  key={index}
                  className={`relative group ${
                    draggedIndex === index ? 'opacity-50' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                >
                  <div 
                    className="absolute top-0 left-0 w-full h-5 bg-black bg-opacity-40 flex justify-center items-center cursor-move z-10"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                  >
                    <BsGripVertical className="text-white text-xs" />
                  </div>
                  
                  {preview.type === 'image' && (
                    <img 
                      src={preview.url} 
                      alt="preview" 
                      className="w-full h-20 object-cover" 
                    />
                  )}
                  
                  {preview.type === 'video' && (
                    <video 
                      src={preview.url} 
                      className="w-full h-20 object-cover" 
                      muted 
                    />
                  )}
                  
                  {preview.type === 'pdf' && (
                    <div className="w-full h-20 bg-gray-100 flex flex-col items-center justify-center p-1">
                      <div className="bg-gray-200 border-2 border-dashed rounded-lg w-8 h-8 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-500">PDF</span>
                      </div>
                      <p className="mt-1 text-[10px] text-gray-500 text-center truncate w-full px-0.5">
                        {preview.name}
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleRemoveMedia(index)}
                    className="absolute top-5 right-1 bg-red-600 text-white p-0.5 rounded-full hover:bg-red-700 z-10"
                  >
                    <BsTrash size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-4">
            <div />
            <TextButton
              text="Next"
              onClick={nextStep}
              bgColor="bg-violet-700"
              hoverColor="hover:bg-violet-800"
              textColor="text-white"
              disabled={mediaFiles.length === 0}
            />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
              <TextArea
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                rows={8}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media Preview</label>
              <div className="grid grid-cols-2 gap-2">
                {mediaPreviews.map((preview, index) => (
                  <div 
                    key={index} 
                    className="relative border rounded overflow-hidden"
                  >
                    {preview.type === 'image' && (
                      <img 
                        src={preview.url} 
                        alt="preview" 
                        className="w-full h-24 object-cover" 
                      />
                    )}
                    
                    {preview.type === 'video' && (
                      <video 
                        src={preview.url} 
                        className="w-full h-24 object-cover" 
                        muted 
                      />
                    )}
                    
                    {preview.type === 'pdf' && (
                      <div className="w-full h-24 bg-gray-100 flex flex-col items-center justify-center p-1">
                        <div className="bg-gray-200 border-2 border-dashed rounded-lg w-10 h-10 flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-500">PDF</span>
                        </div>
                        <p className="mt-1 text-[10px] text-gray-500 text-center truncate w-full px-0.5">
                          {preview.name}
                        </p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleRemoveMedia(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-0.5 rounded-full hover:bg-red-700"
                    >
                      <BsTrash size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <TextButton 
              text="Back" 
              onClick={prevStep} 
              bgColor="bg-gray-200"
              hoverColor="hover:bg-gray-300"
            />
            <TextButton
              text="Next"
              onClick={nextStep}
              bgColor="bg-violet-700"
              hoverColor="hover:bg-violet-800"
              textColor="text-white"
              disabled={!caption.trim()}
            />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="bg-white rounded-sm shadow-sm p-6 space-y-4 border">
            <div className="flex items-center gap-3">
              <BsPersonCircle className="text-3xl text-violet-700" />
              <p className="font-semibold text-gray-800">{user?.name || 'Anonymous'}</p>
            </div>

            <div className="relative">
              {mediaPreviews.length === 1 ? (
                mediaPreviews[0].type === 'image' ? (
                  <img
                    src={mediaPreviews[0].url}
                    className="w-full h-72 object-cover rounded"
                    alt="preview"
                  />
                ) : mediaPreviews[0].type === 'video' ? (
                  <video controls className="w-full h-72 object-cover rounded">
                    <source src={mediaPreviews[0].url} type={mediaFiles[0].type} />
                  </video>
                ) : (
                  <div className="w-full h-72 bg-gray-100 flex flex-col items-center justify-center p-2">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-500">PDF</span>
                    </div>
                    <p className="mt-4 text-lg text-gray-500 text-center">
                      {mediaPreviews[0].name}
                    </p>
                  </div>
                )
              ) : (
                <div className="flex overflow-x-auto gap-2 pb-2">
                  {mediaPreviews.map((preview, index) => (
                    <div key={index} className="relative flex-shrink-0 w-48">
                      {preview.type === 'image' && (
                        <img 
                          src={preview.url} 
                          className="h-64 w-48 rounded object-cover border" 
                          alt={`Preview ${index}`}
                        />
                      )}
                      
                      {preview.type === 'video' && (
                        <video 
                          src={preview.url} 
                          className="h-64 w-48 rounded object-cover border" 
                          muted 
                        />
                      )}
                      
                      {preview.type === 'pdf' && (
                        <div className="h-64 w-48 bg-gray-100 rounded flex flex-col items-center justify-center p-2 border">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-500">PDF</span>
                          </div>
                          <p className="mt-2 text-xs text-gray-500 text-center truncate w-full px-1">
                            {preview.name}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-gray-700 whitespace-pre-wrap">{caption}</p>

            <div className="flex justify-around text-gray-600 border-t pt-3">
              <button className="flex items-center gap-1 hover:text-red-500"><BsHeart /> Like</button>
              <button className="flex items-center gap-1 hover:text-blue-500"><BsChat /> Comment</button>
              <button className="flex items-center gap-1 hover:text-green-500"><BsShare /> Share</button>
            </div>

            <div className="flex justify-between mt-6">
              <TextButton 
                text="Back" 
                onClick={prevStep} 
                bgColor="bg-gray-200"
                hoverColor="hover:bg-gray-300"
              />
              <TextButton
                text="Post"
                onClick={handleSubmit}
                bgColor="bg-green-600"
                hoverColor="hover:bg-green-700"
                textColor="text-white"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePostSPopup;