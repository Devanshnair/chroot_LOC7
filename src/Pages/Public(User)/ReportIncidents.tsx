import { useState, useEffect } from 'react';
import { Upload, Send, Loader } from 'lucide-react';
import { baseUrl } from '../../App';

interface FormData {
  title: string;
  description: string;
  file: File | null;
  coordinates: [number, number] | null;
  location: string;
  incident_type: string;
  status: string;
}

const ReportIncidents = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    file: null,
    coordinates: null,
    location: '',
    incident_type: 'normal',
    status: 'reported'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];
        setFormData(prev => ({...prev, coordinates: coords}));
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`
          );
          const data = await response.json();
          setFormData(prev => ({...prev, location: data.display_name}));
        } catch (err) {
          console.error('Error getting location:', err);
        }
      },
      (error) => {
        console.error('Error:', error);
        setError('Unable to get location');
      }
    );
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({...prev, file: file}));
      
      // Create file preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('incident_type', formData.incident_type);
      submitData.append('status', formData.status);
      
      if (formData.coordinates) {
        submitData.append('coordinates', JSON.stringify(formData.coordinates));
      }
      if (formData.location) {
        submitData.append('location', formData.location);
      }
      if (formData.file) {
        submitData.append('file', formData.file);
      }
      console.log(formData.file);
      

      const response = await fetch(`${baseUrl}/api/cases/incidents/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'ngrok-skip-browser-warning': '444'
        },
        body: submitData
      });

      if (!response.ok) throw new Error('Failed to submit report');

      alert('Report submitted successfully!');
      // Reset form
      setFormData({
        title: '',
        description: '',
        file: null,
        coordinates: null,
        location: '',
        incident_type: 'normal',
        status: 'reported'
      });
      setFilePreview(null);
    } catch (err) {
      setError('Failed to submit report');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Report an Incident</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Evidence (Photo/Video)
          </label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex items-center justify-center gap-2 text-gray-600"
            >
              <Upload size={20} />
              <span>Click to upload file</span>
            </label>
          </div>
          {filePreview && (
            <div className="mt-2">
              {formData.file?.type.startsWith('image/') ? (
                <img src={filePreview} alt="Preview" className="h-32 object-cover rounded" />
              ) : (
                <video src={filePreview} className="h-32" controls />
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg
            hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            <>
              <Send size={20} />
              Submit Report
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReportIncidents;