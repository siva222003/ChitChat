import bcrypt from "bcryptjs";

const genHash = async (field: string) => {
  const hashedField = await bcrypt.hash(field, 12);
  return hashedField;
};

export default genHash;
