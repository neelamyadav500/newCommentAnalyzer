import React from 'react';
const ConclusionBox = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <p>No comments to display.</p>;
    }

    const totalComments = comments.length;
    const positiveCount = comments.filter(comment => comment.sentiment === 'positive').length;
    const negativeCount = comments.filter(comment => comment.sentiment === 'negative').length;
    const neutralCount = comments.filter(comment => comment.sentiment === 'neutral').length;

    return (
        <div className="ConclusionBox">
            <h3>Analysis Summary</h3>
            <table className="summaryTable">
                <thead>
                    <tr>
                        <th>Total Comments</th>
                        <th>Positive Comments</th>
                        <th>Negative Comments</th>
                        <th>Neutral Comments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalComments}</td>
                        <td>{positiveCount}</td>
                        <td>{negativeCount}</td>
                        <td>{neutralCount}</td>
                    </tr>
                </tbody>
            </table>

            <h4>Detailed Comment Analysis</h4>
            <table className="commentsTable">
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th>Sentiment</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index} className={comment.sentiment}>
                            <td>{comment.text}</td>
                            <td>{comment.sentiment.charAt(0).toUpperCase() + comment.sentiment.slice(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConclusionBox;
