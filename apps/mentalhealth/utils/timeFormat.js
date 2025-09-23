export const formatTimeAgo = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '1m ago';
    
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return '1m ago';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 43200) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return `${Math.floor(diffInMinutes / 43200)}mo ago`;
  } catch (error) {
    return '1m ago';
  }
};
