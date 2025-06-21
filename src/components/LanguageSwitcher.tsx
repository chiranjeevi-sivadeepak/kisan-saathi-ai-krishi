
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { value: 'english', label: 'English', flag: '🇺🇸' },
    { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'telugu', label: 'తెలుగు', flag: '🇮🇳' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-white" />
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-32 bg-transparent border-white text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span className={lang.value === 'telugu' ? 'font-bold' : ''}>{lang.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
