import { deleteAsync } from 'del'; // import delet

export const clear = () => {
  return deleteAsync(app.path.clean);
}
