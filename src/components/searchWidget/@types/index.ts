export type TSearchWidget = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  clearSearch: React.MouseEventHandler<HTMLImageElement>;
};
