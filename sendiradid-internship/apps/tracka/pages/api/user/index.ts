import { getSession } from 'next-auth/react';
import axios from 'axios';

const Handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: 'unathorized' });
  }

  const apiToken = session.user['apiToken'];
  const config = {
    headers: {
      Authorization: apiToken,
    },
  };
  const respons = await axios.get(
    `https://api.clickup.com/api/v2/user`,
    config
  );
  const { data } = respons;
  res.status(200).json(data);
};

export default Handler;
