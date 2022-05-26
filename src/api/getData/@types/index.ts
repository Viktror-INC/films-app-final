export type TGetData = {
  url: string;
  options: {
    method: string;
    headers: {
      'Content-Type': string;
      Accept: string;
    };
    body: BodyInit;
  };
};
