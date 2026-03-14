import type { BadgeVariant, FileStatus } from '@/types';
import Feather from '@expo/vector-icons/Feather';

export const FILE_TYPES = ['PDF', 'DOCX', 'TXT', 'IMAGE'];

export const typeIconMap: Record<string, keyof typeof Feather.glyphMap> = {
  pdf: 'file-text',
  txt: 'file-text',
  docx: 'file-text',
  doc: 'file-text',
  image: 'image',
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  zip: 'archive',
};

export const statusConfig: Record<FileStatus, { label: string; variant: BadgeVariant; border: string }> = {
  uploading:  { label: 'Uploading',  variant: 'sky',     border: 'border border-sky-500/30' },
  processing: { label: 'Processing', variant: 'amber',   border: 'border border-amber-500/30' },
  ready:      { label: 'Ready',      variant: 'emerald', border: 'border border-emerald-500/30' },
};

export const files = [
  {
    id: '1',
    name: 'Project-Brief.pdf',
    type: 'pdf',
    size: '2.4 MB',
    status: 'ready',
    updatedAt: '2m ago',
  },
  {
    id: '2',
    name: 'Meeting Notes.txt',
    type: 'txt',
    size: '12 KB',
    status: 'processing',
    updatedAt: 'just now',
  },
  {
    id: '3',
    name: 'Brand Assets.zip',
    type: 'zip',
    size: '18.2 MB',
    status: 'uploading',
    updatedAt: '5s ago',
  },
  {
    id: '4',
    name: 'Roadmap.docx',
    type: 'docx',
    size: '1.1 MB',
    status: 'ready',
    updatedAt: '1h ago',
  },
  {
    id: '5',
    name: 'Product Shot.png',
    type: 'image',
    size: '3.9 MB',
    status: 'ready',
    updatedAt: '3h ago',
  },
];