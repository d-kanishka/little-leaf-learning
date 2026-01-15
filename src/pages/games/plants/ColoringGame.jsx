import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Eraser } from 'lucide-react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { plantsData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

const colors = [
  '#A5D6A7', '#43A047', 
  '#388E3C', '#2E7D32', '#1B5E20', 
   '#9CCC65', 
  '#8BC34A', '#7CB342', '#689F38', 
  '#FFEB3B', '#FDD835', '#FBC02D',
  '#795548', '#6D4C41', '#5D4037', 
  '#FF9800', '#FB8C00', '#F57C00',
  '#E91E63', '#D81B60', '#C2185B',
  '#FF6B6B', '#FF9999', 
  '#4ECDC4', '#88D9D9', 
  '#45B7D1', '#7DC8E8', 
  '#96CEB4', '#B8E6B8', 
  '#FFEAA7', '#FFF4CC', 
  '#DDA0DD', '#E8B8E8', 
  '#98D8C8', '#B8E6D8', 
  '#F7DC6F', '#FFEE99',
  '#BB8FCE', '#D5B8E8',
  '#85C1E9', '#A9D4F5', 
  '#F5B041', '#FFCC80', 
  '#58D68D', '#8AEFB0',
  '#000000', '#333333', '#666666', 
  '#C0392B', '#8E44AD', '#2C3E50', '#F39C12'
];
const brushSizes = [3, 6, 10, 15, 20];

export default function PlantColoringGame() {
  const { playSound } = useAudio();
  const canvasRef = useRef(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#81C784');
  const [brushSize, setBrushSize] = useState(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);
  const [isEraser, setIsEraser] = useState(false);
  const [outlineCanvas, setOutlineCanvas] = useState(null);


  const coloringPlants = plantsData.slice(0, 6);


  useEffect(() => {
    if (!selectedPlant) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create a separate canvas for the outline
    const outline = document.createElement('canvas');
    outline.width = canvas.width;
    outline.height = canvas.height;
    const outlineCtx = outline.getContext('2d');
    
    // Load the outline image or use emoji as fallback
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8;
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      // Draw outline on main canvas
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      
      // Save outline to separate canvas
      outlineCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
      setOutlineCanvas(outline);
    };
    img.onerror = () => {
      // Fallback: draw emoji
      ctx.font = '150px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000000';
      ctx.fillText(selectedPlant.emoji, canvas.width / 2, canvas.height / 2);
      
      // Save emoji to outline canvas
      outlineCtx.font = '150px serif';
      outlineCtx.textAlign = 'center';
      outlineCtx.textBaseline = 'middle';
      outlineCtx.fillStyle = '#000000';
      outlineCtx.fillText(selectedPlant.emoji, canvas.width / 2, canvas.height / 2);
      setOutlineCanvas(outline);
    };
    img.src = selectedPlant.outlineImage;
  }, [selectedPlant]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getPos(e);
    setLastPos(pos);
    draw(e);
  };

  const endDraw = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const draw = (e) => {
    if (!isDrawing || !selectedPlant) return;
    e.preventDefault();
    
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    
    if (isEraser) {
      // Save current state
      ctx.save();
      
      // Create a temporary canvas for erasing
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = ctx.canvas.width;
      tempCanvas.height = ctx.canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      
      // Copy current drawing
      tempCtx.drawImage(ctx.canvas, 0, 0);
      
      // Draw white circle where eraser touches
      tempCtx.globalCompositeOperation = 'destination-out';
      tempCtx.beginPath();
      if (lastPos) {
        tempCtx.moveTo(lastPos.x, lastPos.y);
        tempCtx.lineTo(pos.x, pos.y);
        tempCtx.lineWidth = brushSize;
        tempCtx.lineCap = 'round';
        tempCtx.lineJoin = 'round';
        tempCtx.stroke();
      } else {
        tempCtx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
        tempCtx.fill();
      }
      
      // Clear main canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Redraw outline first
      if (outlineCanvas) {
        ctx.drawImage(outlineCanvas, 0, 0);
      }
      
      // Draw the erased version
      ctx.drawImage(tempCanvas, 0, 0);
      
      ctx.restore();
    } else {
      // Normal drawing
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (lastPos) {
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    setLastPos(pos);
  };

  const handleSelectPlant = (plant) => {
    playSound('click');
    setSelectedPlant(plant);
  };

  const handleBack = () => {
    playSound('click');
    setSelectedPlant(null);
  };

  const clearCanvas = () => {
    playSound('click');
    if (selectedPlant) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear the entire canvas
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Redraw the outline
      if (outlineCanvas) {
        ctx.drawImage(outlineCanvas, 0, 0);
      } else {
        // Fallback: redraw outline
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8;
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };
        img.onerror = () => {
          ctx.font = '150px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000000';
          ctx.fillText(selectedPlant.emoji, canvas.width / 2, canvas.height / 2);
        };
        img.src = selectedPlant.outlineImage;
      }
    }
  };

  const toggleEraser = () => {
    playSound('click');
    setIsEraser(!isEraser);
  };

  // Selection screen
  if (!selectedPlant) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-emerald-100 pb-24">
        <AudioToggle />
        <header className="pt-4 px-4">
          <div className="max-w-2xl mx-auto">
            <BackButton to="/plants" />
            <div className="text-center mt-4 mb-4">
              <h1 className="text-2xl font-bold text-foreground">🎨 Plant Coloring Book</h1>
              <p className="text-muted-foreground">Choose a plant to color!</p>
            </div>
          </div>
        </header>
        <main className="px-4">
          <div className="max-w-lg mx-auto grid grid-cols-3 gap-3">
            {coloringPlants.map((plant) => (
              <button
                key={plant.id}
                onClick={() => handleSelectPlant(plant)}
                className="bg-white rounded-2xl p-3 shadow-lg hover:scale-105 transition-transform border-2 border-white hover:border-primary"
              >
                <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-xl mb-2">
                  {plant.outlineImage ? (
                    <img 
                      src={plant.outlineImage} 
                      alt={plant.name}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.querySelector('.emoji-fallback').style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span className="text-5xl emoji-fallback" style={{ display: plant.outlineImage ? 'none' : 'flex' }}>{plant.emoji}</span>
                </div>
                <span className="text-sm font-bold block text-center">{plant.name}</span>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Coloring screen
  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />
      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Back</span>
          </button>
          <div className="text-center mt-2 mb-2">
            <h1 className="text-xl font-bold">Color the {selectedPlant.name} {selectedPlant.emoji}</h1>
          </div>
        </div>
      </header>
      <main className="px-4">
        <div className="max-w-lg mx-auto">
          {/* Eraser and Brush sizes */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleEraser}
                className={`px-4 py-2 rounded-xl font-bold shadow-md transition-transform flex items-center gap-2 ${isEraser ? 'bg-red-100 text-red-700 ring-2 ring-red-300' : 'bg-white'}`}
              >
                <Eraser className="w-4 h-4" />
                {isEraser ? 'Eraser ON' : 'Eraser'}
              </button>
              <div className="flex items-center gap-1 bg-white/80 p-2 rounded-xl">
                <span className="text-sm font-medium px-2">Brush:</span>
                {brushSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { playSound('click'); setBrushSize(size); }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${brushSize === size ? 'ring-2 ring-primary scale-110' : ''}`}
                    style={{ 
                      backgroundColor: isEraser ? '#f87171' : selectedColor,
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div 
                      className="rounded-full bg-current"
                      style={{ 
                        width: Math.max(2, size/2), 
                        height: Math.max(2, size/2),
                        backgroundColor: isEraser ? '#ffffff' : 'currentColor'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Color palette - Now with same colors as animal coloring */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2 text-center">Colors</div>
            <div className="grid grid-cols-9 gap-1 justify-center">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => { 
                    playSound('click'); 
                    setSelectedColor(c);
                    setIsEraser(false);
                  }}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === c && !isEraser ? 'border-foreground scale-110 ring-1 ring-offset-1' : 'border-white'}`}
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full max-w-[400px] mx-auto rounded-2xl shadow-lg bg-white touch-none border-4 border-white"
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseMove={draw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchEnd={endDraw}
            onTouchMove={draw}
          />

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={clearCanvas}
              className="flex-1 py-3 bg-white rounded-xl font-bold shadow-md hover:scale-105 transition-transform"
            >
              🗑️ Clear Drawing
            </button>
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold shadow-md hover:scale-105 transition-transform"
            >
              ✓ Done Coloring
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}