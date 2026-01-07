"use client";

import React, { useRef, useEffect } from 'react';

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
  className?: string;
}

const Squares: React.FC<SquaresProps> = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const effectiveSquareSize = squareSize || 40;

      const startX = Math.floor(gridOffset.current.x / effectiveSquareSize) * effectiveSquareSize;
      const startY = Math.floor(gridOffset.current.y / effectiveSquareSize) * effectiveSquareSize;

      for (let x = startX; x < canvas.width + effectiveSquareSize; x += effectiveSquareSize) {
        for (let y = startY; y < canvas.height + effectiveSquareSize; y += effectiveSquareSize) {
          const squareX = x - (gridOffset.current.x % effectiveSquareSize);
          const squareY = y - (gridOffset.current.y % effectiveSquareSize);

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / effectiveSquareSize) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / effectiveSquareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, effectiveSquareSize, effectiveSquareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, effectiveSquareSize, effectiveSquareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, '#060010');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
        const effectiveSpeed = Math.max(speed, 0.1);
        const effectiveSquareSize = squareSize || 40;
        switch (direction) {
            case 'right':
            gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + effectiveSquareSize) % effectiveSquareSize;
            break;
            case 'left':
            gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + effectiveSquareSize) % effectiveSquareSize;
            break;
            case 'up':
            gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + effectiveSquareSize) % effectiveSquareSize;
            break;
            case 'down':
            gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + effectiveSquareSize) % effectiveSquareSize;
            break;
            case 'diagonal':
            gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + effectiveSquareSize) % effectiveSquareSize;
            gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + effectiveSquareSize) % effectiveSquareSize;
            break;
            default:
            break;
        }

        drawGrid();
        requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const effectiveSquareSize = squareSize || 40;

        const startX = Math.floor(gridOffset.current.x / effectiveSquareSize) * effectiveSquareSize;
        const startY = Math.floor(gridOffset.current.y / effectiveSquareSize) * effectiveSquareSize;

        const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x % effectiveSquareSize - startX % effectiveSquareSize) / effectiveSquareSize);
        const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y % effectiveSquareSize - startY % effectiveSquareSize) / effectiveSquareSize);

        if (
            !hoveredSquareRef.current ||
            hoveredSquareRef.current.x !== hoveredSquareX ||
            hoveredSquareRef.current.y !== hoveredSquareY
        ) {
            hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
        }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className={className}></canvas>;
};

export default Squares;
