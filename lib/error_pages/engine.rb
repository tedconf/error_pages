module ErrorPages
  class Engine < ::Rails::Engine
    class Railtie < ::Rails::Railtie
      initializer "error_pages.install_app" do |app|
        app.config.exceptions_app = ActionDispatch::PublicExceptions.new Engine.root.join('public').to_s
      end
    end
  end
end
