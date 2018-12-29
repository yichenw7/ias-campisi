export default function instanceInit() {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;

    Object.seal(instance);
    return instance;
  };
}
