import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = (key: string) => {
	const q = new URLSearchParams(useLocation().search);

	return q;
};

export default useQuery;
