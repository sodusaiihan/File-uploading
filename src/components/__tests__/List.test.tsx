import { render, RenderResult } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import List from '../List';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.url = 'http://localhost:5000';
axios.defaults.adapter = httpAdapter;

describe('List component', () => {
  let screen: RenderResult;

  beforeEach(() => {
    screen = render(<List />);
    nock('http://localhost:5000/')
      .get('/all/images')
      .reply(
        200,
        [
          {
            _id: '1',
            uploadDate: new Date(),
            filename: 'Hello.jpg',
            contentType: 'image/jpeg',
          },
        ]
      );
  }); 

  test('should match snapshot', () => {
    expect(screen.baseElement).toMatchSnapshot();
  });

  test('should fetch all files', async () => {
    expect(screen.getByText('No Data')).toBeInTheDocument();
    expect(await screen.findByText('Hello.jpg')).toBeInTheDocument();
  });
});
