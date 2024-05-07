export const LOAD_DATA = 'LOAD_DATA';

export const loadData = (data: any) => ({
  type: LOAD_DATA,
  payload: data
});