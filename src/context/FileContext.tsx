import React, { createContext, useState, useContext, ReactNode } from 'react';

// 컨텍스트에서 다룰 값들의 타입
type FileContextType = {
    selectedFiles: File[] | null;
    setSelectedFiles: (files: File[]) => void;
};

// 실제 컨텍스트 생성
const FileContext = createContext<FileContextType | undefined>(undefined);

// Provider 컴포넌트 (App.tsx에서 감싸주면, 하위 컴포넌트에서 사용 가능)
export const FileProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFiles, setSelectedFilesState] = useState<File[] | null>(null);

    const setSelectedFiles = (files: File[]) => {
        setSelectedFilesState(files);
    };

    return (
        <FileContext.Provider value={{ selectedFiles, setSelectedFiles }}>
            {children}
        </FileContext.Provider>
    );
};

// Context 사용을 편하게 하기 위한 custom hook
export const useFileContext = (): FileContextType => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
};
