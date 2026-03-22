// src/components/ar/LocationQR.tsx
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { MapPin, QrCode, X } from 'lucide-react';
import { Button } from '../ui/button';

type LocationQRProps = {
  title: string;
  mapUrl: string;
};

export function LocationQR({ title, mapUrl }: LocationQRProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 w-full">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-green-300 text-green-700 hover:bg-green-50 z-20 relative"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        {open ? <X className="h-4 w-4 mr-2" /> : <QrCode className="h-4 w-4 mr-2" />}
        {open ? 'Hide Maps QR' : 'Show Maps QR'}
      </Button>

      {open && (
        <div
          className="mt-3 bg-white border border-green-200 rounded-xl p-4 shadow-sm text-center relative z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white inline-block p-3 rounded-lg shadow">
            <QRCodeCanvas
              value={mapUrl}
              size={120}
              bgColor="#ffffff"
              fgColor="#111827"
              includeMargin={true}
              level="H"
            />
          </div>

          <p className="text-xs text-slate-700 mt-3 font-semibold flex items-center justify-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-green-600" />
            {title}
          </p>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-700 underline break-all mt-2 block"
          >
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}