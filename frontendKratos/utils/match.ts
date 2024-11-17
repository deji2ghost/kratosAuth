const match = (
   variant: string,
   stylesObject: {
      [key: string]: string;
   },
) => {
   return stylesObject[variant] || "";
};

export default match;
