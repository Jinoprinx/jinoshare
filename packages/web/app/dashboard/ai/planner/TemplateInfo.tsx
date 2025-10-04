const TemplateInfo = ({ templateName, commonFields, templateFields }) => {
  const fields = [...commonFields, ...(templateFields[templateName] || [])];

  return (
    <div className="mb-4 p-4 bg-blue-900/30 border border-blue-600/50 rounded-md">
      <p className="text-blue-400">
        Using template: <span className="font-semibold">{templateName}</span>
      </p>
      <div className="mt-2 text-sm text-gray-400">
        <p className="font-semibold">Fields:</p>
        <ul className="list-disc list-inside">
          {fields.map((field) => (
            <li key={field.name}>
              <span className="font-semibold">{field.label}:</span>
              {field.example && <span className="text-gray-500"> (e.g., {field.example})</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};