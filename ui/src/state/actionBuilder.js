import {
    createRoutine,
    createRoutineCreator,
    defaultRoutineStages,
  } from 'redux-saga-routines';
  
  const actionBuilder = (domain, emoji) => {
    const actionTypePrefix = (action) => `${domain} ${emoji} ${action}`;
  
    const build = (action) => createRoutine(actionTypePrefix(action));
  
    const withStages = (action, ...stages) => {
      const creator = createRoutineCreator([...defaultRoutineStages, ...stages]);
      return creator(actionTypePrefix(action));
    };
  
    const fileReaderStages = (action) =>
      withStages(action, 'PROGRESS', 'ABORT');
  
    build.withStages = withStages;
    build.fileReaderStages = fileReaderStages;
  
    return build;
  };
  
  export default actionBuilder;