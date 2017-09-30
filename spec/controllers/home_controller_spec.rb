require 'spec_helper'
require 'rails_helper'

RSpec.describe HomeController do
  describe "GET encrypt_key" do
    it "encrypts a key" do
      test_input_key = 'X'

      xhr :post, :encrypt_key, input_key: test_input_key, title: "First post", body: "This is the body"

      expect(response.code).to eq('200')
      expect(response.body).to include('letter')

      parsed_response=JSON.parse(response.body)

      expect(parsed_response['letter']).to eq('V')
    end
  end
end
