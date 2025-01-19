export function getPicturePath(providerName, size = "small") {
    // TODO make a more robust way of accessing the provider images
    const parts = providerName.toLowerCase().split(" ");
    if (parts.length !== 2) {
        throw new Error(
            "Provider name must contain exactly two parts (first and last name)",
        );
    }
    return `/${parts.join("_")}_${size}.png`;
}
