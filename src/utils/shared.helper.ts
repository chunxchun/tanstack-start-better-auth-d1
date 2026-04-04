import { uploadImage } from "@/lib/imageUpload";
import { buildR2AccessKey } from "@/lib/utils";

// type FileUploadConfig<TId> = {
//   file: File | null;
//   uploadFn: (file: File, id: TId) => Promise<string>;
//   fieldKey: string; // The key in the database (e.g., 'bannerUrl')
// };

// async function handleCreateWithFiles<TData, TResult extends { id: any }>(
//   data: TData,
//   createFn: (payload: { data: TData }) => Promise<TResult[] | null>,
//   updateFn: (payload: { data: any }) => Promise<any>,
//   fileConfigs: FileUploadConfig<TResult["id"]>[],
//   entityName: string = "Record",
// ) {
//   try {
//     // 1. Create the base record
//     const result = await createFn({ data });
//     if (!result || result.length === 0) {
//       throw new Error(`Failed to create ${entityName}: No result returned`);
//     }

//     const recordId = result[0].id;
//     const updateData: Record<string, any> = { id: recordId };

//     // 2. Process all files dynamically
//     const uploadPromises = fileConfigs.map(async (config) => {
//       if (config.file) {
//         const url = await config.uploadFn(config.file, recordId);
//         updateData[config.fieldKey] = url;
//       } else {
//         updateData[config.fieldKey] = null;
//       }
//     });

//     await Promise.all(uploadPromises);

//     // 3. Update the record with URLs
//     await updateFn({ data: updateData });

//     toast.success(`${entityName} created successfully`);
//     return recordId;
//   } catch (error) {
//     console.error(`Failed to create ${entityName}:`, error);
//     toast.error(`Failed to create ${entityName}`);
//     throw error;
//   }
// }

// const handleCreateSubmit = async <
//   SelectT extends { id: number },
//   InsertT,
//   UpdateT,
// >(
//   values: InsertT,
//   createFn: ({ data: {data: InsertT } }) => Promise<SelectT[]>,
//   updateFn: ({ data: {data: UpdateT } }) => Promise<SelectT[]>,
//   ...files: File[]
// ) => {
//   try {
//     const createResult = await createFn({ data: values });
//     if (!createResult) {
//       throw new Error("Failed to create");
//     }

//     if (createResult.length === 0) {
//       throw new Error("Failed to create: No result returned");
//     }

//     const id = createResult[0].id;

//     if (files && files.length > 0) {
//     }
//   } catch (error) {}
// };

export const getImageUrl = async (folder: string, key: string, file: File) => {
  if (!file) return null;
  try {
    const imageKey = buildR2AccessKey(folder, key, file);
    const result = await uploadImage(file, imageKey);

    if (!result) {
      throw new Error(`Failed to upload ${key} image`);
    }

    return result.url;
  } catch (error) {
    console.error(`Failed to upload ${key} image:`, error);
    throw new Error(
      error instanceof Error
        ? error.message
        : `Unknown error uploading ${key} image`,
    );
  }
};
