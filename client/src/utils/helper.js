
const getExercises = async (muscle) => {
    const apiKey = 'TlQ8rtTCCcfBCBzcvNrv6Y3yH8BxZZt3oLUstZkQ';
    const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Fetch request failed:', error);
        throw new Error('Failed to retrieve exercises');
    }
};

export default getExercises;