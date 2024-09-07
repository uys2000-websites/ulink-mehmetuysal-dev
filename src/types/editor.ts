interface EditorBlock {
  id: string;
  type: string;
  data: any;
}

interface EditorResult {
  blocks: Array<EditorBlock>;
  time: number;
  version: string;
}
