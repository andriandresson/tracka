import { FC, useState, useEffect } from 'react';
import {
  Step,
  CustomAccordion,
  RootObject,
  CustomerSelection,
} from '@sendiradid-internship/tracka-ui';
import { Card } from '@mui/material';
import { getSelectedLists } from './selectionUtils';
interface Props {
  data: any;
  steps: Step[];
  setValue: (property: string, newValue: any) => void;
  activeStep: number;
}

const getInitialData = (spaces: RootObject[]) => {
  const initialData = {} as any;
  spaces.forEach((space) => {
    if (space.folders.length > 0) {
      const { id: spaceId } = space?.folders[0].space;
      if (!spaceId) {
        return initialData;
      }
      initialData[spaceId] = {};
      space.folders?.forEach((folder: any) => {
        const { id: folderId } = folder;
        if (!folderId) {
          return initialData;
        }
        if (folder.lists.length > 0) {
          initialData[spaceId][folderId] = {};
        }
        folder.lists.forEach((list: any) => {
          const { id: listId } = list;
          if (!listId) {
            return initialData;
          }
          initialData[spaceId][folderId][listId] = true;
        });
      });
    }
  });
  return initialData;
};

export const CustomerSelect: FC<Props> = ({
  data,
  steps,
  setValue,
  activeStep,
}) => {
  const spaces = data.map((element: any) => {
    return element.folders;
  });

  const elem = [...data] as RootObject[];
  const initalData: CustomerSelection = getInitialData(elem);
  const [selection, setSelection] = useState<CustomerSelection>(initalData);

  useEffect(() => {
    const selectedArray = getSelectedLists(selection);
    steps[activeStep].selected = selectedArray;
    setValue('steps', steps);
    //set value of active step to selected array
  }, [selection]);

  const handleCheckboxChange = (relativeId: string, value: boolean) => {
    const [spaceId, folderId, listId] = relativeId.split('#');
    console.log(
      `spaceId: ${spaceId}, folderId: ${folderId}, listId: ${listId}`
    );

    //if there is listId then change the list value
    if (listId) {
      setSelection({
        ...selection,
        [spaceId]: {
          ...selection[spaceId],
          [folderId]: {
            ...selection[spaceId][folderId],
            [listId]: value,
          },
        },
      });
    } else if (!listId) {
      if (folderId) {
        setSelection({
          ...selection,
          [spaceId]: {
            ...selection[spaceId],
            //set all lists in the folder to the same value
            [folderId]: {
              ...selection[spaceId][folderId],
              ...(Object.keys(selection[spaceId][folderId]).forEach((list) => {
                selection[spaceId][folderId][list] = value;
              }) as any),
            },
          },
        });
      }
      //if there is no folderId then change the value of all lists in all the folders
      else if (!folderId) {
        setSelection({
          ...selection,
          [spaceId]: {
            ...selection[spaceId],
            ...(Object.keys(selection[spaceId]).forEach((folder) => {
              selection[spaceId][folder] = {
                ...selection[spaceId][folder],
                ...(Object.keys(selection[spaceId][folder]).forEach((list) => {
                  selection[spaceId][folder][list] = value;
                }) as any),
              };
            }) as any),
          },
        });
      }
    }
  };

  return (
    <Card variant="outlined">
      {spaces.map((space: any) => {
        if (space[0]) {
          return (
            <CustomAccordion
              key={space[0].space.id}
              onValueSet={handleCheckboxChange}
              title={space[0]?.space?.name}
              relativeId={space[0]?.space.id}
              selection={selection}
            >
              {space.map((folder: any) => {
                if (folder.lists[0]) {
                  return (
                    <CustomAccordion
                      key={folder.id}
                      onValueSet={handleCheckboxChange}
                      title={folder.name}
                      relativeId={`${space[0]?.space.id}#${folder.id}`}
                      selection={selection}
                    >
                      {folder.lists.map((list: any) => {
                        if (list) {
                          return (
                            <CustomAccordion
                              key={list.id}
                              onValueSet={handleCheckboxChange}
                              title={list.name}
                              elementId={list.id}
                              relativeId={`${space[0]?.space.id}#${folder.id}#${list.id}`}
                              selection={selection}
                            />
                          );
                        } else {
                          return null;
                        }
                      })}
                    </CustomAccordion>
                  );
                } else {
                  return null;
                }
              })}
            </CustomAccordion>
          );
        } else {
          return null;
        }
      })}
    </Card>
  );
};
