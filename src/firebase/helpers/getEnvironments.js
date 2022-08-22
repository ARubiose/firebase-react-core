export const getViteEnvironments = () => {
    import.meta.env

    return {
        ...import.meta.env,
    }
}