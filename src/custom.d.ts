type RecordItem = {
    tags: string[] | undefined;
    notes: string | undefined;
    type: string | undefined;
    amount: number | undefined;
    createAt?: string;
  };
  type Tag = {
    id: string;
    name: string;
  };
  type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => string;
    update: (id: string, name: string) => "success" | "Not Found" | string;
    save: () => void;
    remove: (id: string) => boolean;
  };

  interface Window{
    tagList: Tag[];
    createTag: (name: string) => void;
    
  }
  type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag;
  };