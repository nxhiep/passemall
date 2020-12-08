export default function JsonLD(data) {
    let array = [];
    data && Object.keys(data).forEach((key) => {
        array.push({
            "@type": "Question",
            "name": key,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": data[key]
            }
        });
    })
    return <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": array
        }) }}
    ></script>
}