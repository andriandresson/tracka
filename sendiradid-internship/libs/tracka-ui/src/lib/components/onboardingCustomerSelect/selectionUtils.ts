export type MaybeObjectOrBoolean = {
  [key: string]: MaybeObjectOrBoolean | boolean;
};

export const getSelectedLists = (selection: MaybeObjectOrBoolean): string[] => {
  // check recursivly if any of the values are true
  // if the values are tru add the key to the array and return it

  const selectedLists: string[] = [];
  const checkSelection = (selection: MaybeObjectOrBoolean): void => {
    Object.keys(selection).forEach((key: string) => {
      if (selection[key] === true) {
        selectedLists.push(key);
      } else if (typeof selection[key] === 'object') {
        checkSelection(selection[key] as MaybeObjectOrBoolean);
      }
    });
  };
  checkSelection(selection);
  return selectedLists;
};
