declare module "*.svg" {
  const content: React.FC<{ className: string }>;
  export = content;
}
